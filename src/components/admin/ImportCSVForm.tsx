import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AttributeValue {
  value: string;
}

interface Attribute {
  name: string;
  slug: string;
  type: 'SELECT' | 'MULTI_SELECT' | 'NUMBER' | 'RANGE' | 'TEXT';
  isRequired?: boolean;
  sortOrder?: number;
  attributeValues: AttributeValue[];
}

interface CSVRow {
  [key: string]: string;
}

interface CSVImportCardProps {
  onDataImport: (data: Attribute[], fileName: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export function ImportCSVForm({
  onDataImport,
  acceptedFileTypes = ['.csv'],
  maxFileSize = 10
}: CSVImportCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt']
    },
    maxSize: maxFileSize * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setIsDragging(false);
      setError(null);
      setSuccess(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === 'file-too-large') {
          setError(`File is too large. Maximum size is ${maxFileSize}MB`);
        } else if (rejection.errors[0].code === 'file-invalid-type') {
          setError('Please upload a CSV file');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const convertCSVToAttributes = (csvData: CSVRow[]): Attribute[] => {
    const attributes: Attribute[] = [];

    csvData.forEach((row, index) => {
      try {
        // Extract values from CSV row (assuming specific column structure)
        const name = row['Attribute Name'] || row['Name'] || row['attributeName'] || '';
        const slug = row['slug'] || row['Slug'] || '';
        const type = (row['type'] || row['Attribute Type'] || 'SELECT').toUpperCase() as 
          'SELECT' | 'MULTI_SELECT' | 'NUMBER' | 'RANGE' | 'TEXT';
        
        const isRequired = row['Required']?.toLowerCase() === 'true' || 
                          row['isRequired']?.toLowerCase() === 'true' ||
                          row['Required'] === '1';
        
        const sortOrder = parseInt(row['sortOrder'] || row['Order'] || `${index + 1}`);
        
        // Parse attribute values (comma-separated)
        const valuesString = row['values'] || row['Attribute Values'] || row['Options'] || '';
        const attributeValues = valuesString.split(',')
          .map(value => value.trim())
          .filter(value => value.length > 0)
          .map(value => ({ value }));

        if (name) {
          attributes.push({
            name,
            slug,
            type: ['SELECT', 'MULTI_SELECT', 'NUMBER', 'RANGE', 'TEXT'].includes(type) ? type : 'SELECT',
            // isRequired,
            // sortOrder: isNaN(sortOrder) ? index + 1 : sortOrder,
            attributeValues
          });
        }
      } catch (error) {
        console.warn(`Error processing row ${index + 1}:`, error);
      }
    });

    return attributes;
  };

  const handleFile = (file: File) => {
    setFileInfo({
      name: file.name,
      size: file.size
    });

    setIsLoading(true);
    setProgress(0);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setIsLoading(false);
        setProgress(100);
        
        if (results.errors.length > 0) {
          setError(`Error parsing CSV: ${results.errors[0].message}`);
          return;
        }

        if (results.data.length === 0) {
          setError('CSV file is empty or contains no valid data');
          return;
        }

        try {
          // Convert CSV data to your desired format
          const attributes = convertCSVToAttributes(results.data as CSVRow[]);
          
          if (attributes.length === 0) {
            setError('No valid attributes found in the CSV file');
            return;
          }

          setSuccess(`Successfully imported ${attributes.length} attributes`);
          onDataImport(attributes, file.name);
        } catch (error) {
          setError('Error converting CSV data: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
        
        setTimeout(() => setProgress(0), 2000);
      },
      error: (error) => {
        setIsLoading(false);
        setError(`Error reading file: ${error.message}`);
      }
    });

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleManualSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const resetImport = () => {
    setFileInfo(null);
    setError(null);
    setSuccess(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Attributes from CSV
        </CardTitle>
        <CardDescription>
          Upload a CSV file to import product attributes. Expected columns: Attribute Name, Type, Required, Sort Order, Values
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}
            ${isDragging ? 'bg-primary/5' : ''}
            hover:border-primary hover:bg-primary/5
          `}
        >
          <input {...getInputProps()} />
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            {isDragActive ? 'Drop the CSV file here' : 'Drag & drop your CSV file here'}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse files (max {maxFileSize}MB)
          </p>
        </div>

        {/* Manual File Input */}
        <div className="space-y-2">
          <Label htmlFor="csv-file">Or select file manually:</Label>
          <Input
            id="csv-file"
            type="file"
            accept={acceptedFileTypes.join(',')}
            onChange={handleManualSelect}
            ref={fileInputRef}
            className="cursor-pointer"
          />
        </div>

        {/* CSV Format Guide */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Expected CSV Format:</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Attribute Name</strong>: The name of the attribute (e.g., "Color")</p>
            <p><strong>Type</strong>: SELECT, MULTISELECT, NUMBER, RANGE, or TEXT</p>
            <p><strong>Required</strong>: true/false or 1/0</p>
            <p><strong>Sort Order</strong>: Numeric order for display</p>
            <p><strong>Values</strong>: Comma-separated values (e.g., "Red,Blue,Green")</p>
          </div>
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* File Info */}
        {fileInfo && !isLoading && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">{fileInfo.name}</span>
              <Badge variant="secondary">{formatFileSize(fileInfo.size)}</Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetImport}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}