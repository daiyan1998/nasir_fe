import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";
import { CategorySelector } from "./CategorySelector";
import { DynamicAttributeInput } from "./DynamicAttributeInput";
import { generateSKU, generateSlug } from "@/lib/mockData";
import { AlertCircle } from "lucide-react";
import {
  useGetCategories,
  useGetCategoryById,
} from "@/hooks/queries/useCategoryQuery";
import { Product } from "@/types/Product.type";
import { Skeleton } from "../ui/skeleton";
import { TagSelector } from "./TagSelector";
import { Tag } from "@/types/Tag.type";

// Create a more flexible schema that allows dynamic attributes
const createProductSchema = (
  attributeIds: string[] = [],
  requiredAttributes: string[] = []
) => {
  const attributesSchema: Record<string, z.ZodTypeAny> = {};

  attributeIds.forEach((id) => {
    if (requiredAttributes.includes(id)) {
      attributesSchema[id] = z.any().refine(
        (value) => {
          if (value === undefined || value === null || value === "")
            return false;
          if (Array.isArray(value) && value.length === 0) return false;
          return true;
        },
        { message: "This field is required" }
      );
    } else {
      attributesSchema[id] = z.any().optional();
    }
  });

  return z.object({
    name: z.string().min(1, "Product name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    specifications: z.string().optional(),
    shortDesc: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be positive"),
    salePrice: z.coerce.number().optional(),
    sku: z.string().optional(),
    stock: z.coerce.number().min(0, "Stock must be positive"),
    categoryId: z.string().min(1, "Category is required"),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
    attributes: z.object(attributesSchema).optional(),
  });
};

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface EnhancedProductFormProps {
  product?: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export function EnhancedProductForm({
  product,
  onSave,
  onCancel,
}: EnhancedProductFormProps) {
  const [images, setImages] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState<any>(product?.tags || [])
  const [productSchema, setProductSchema] = useState(() =>
    createProductSchema()
  );
  // hooks
  const { data : categoriesData, isLoading : categoriesLoading } = useGetCategories();
  const categories = categoriesData?.data
  const { data: categoryAttributesData, isLoading: categoryAttributesLoading } =
    useGetCategoryById(selectedCategoryId);


  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      specifications: "",
      shortDesc: "",
      price: 0,
      salePrice: 0,
      sku: "",
      stock: 0,
      categoryId: "",
      metaTitle: "",
      metaDesc: "",
      isActive: false,
      isFeatured: false,
      attributes: {},
    },
    mode: "onChange",
  });

  const watchName = form.watch("name");
  const watchCategoryId = form.watch("categoryId");


  // Update schema when category changes
  useEffect(() => {
    if (categoryAttributesData?.categoryAttributes) {
      const attributeIds = categoryAttributesData.categoryAttributes.map(
        (ca: any) => ca.id
      );
      const requiredAttributes = categoryAttributesData.categoryAttributes
        .filter((ca: any) => ca.isRequired)
        .map((ca: any) => ca.id);

      const newSchema = createProductSchema(attributeIds, requiredAttributes);
      setProductSchema(newSchema);

      // Reset the form with new schema
      const currentValues = form.getValues();
      form.reset(currentValues);
    }
  }, [categoryAttributesData, form]);

  // Auto-generate slug and meta title from name
  useEffect(() => {
    if (watchName && !product) {
      const slug = generateSlug(watchName);
      form.setValue("slug", slug);
      form.setValue("metaTitle", `${watchName} - Premium Quality`);
    }
  }, [watchName, form, product]);

  // Handle category change
  useEffect(() => {
    if (watchCategoryId !== selectedCategoryId) {
      setSelectedCategoryId(watchCategoryId);
      // Reset attributes when category changes
      form.setValue("attributes", {});
    }
  }, [watchCategoryId, selectedCategoryId, form]);

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        specifications: product.specifications || "",
        shortDesc: product.shortDesc || "",
        price: product.price,
        salePrice: product.salePrice,
        sku: product.sku,
        stock: product.stock,
        categoryId: product.categoryId,
        metaTitle: product.metaTitle || "",
        metaDesc: product.metaDesc || "",
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        attributes: product.attributeValues || {},
      });
      setSelectedCategoryId(product.categoryId);
      setImages(product.images);
      setSelectedTags(product.tags || [])
    } else {
      form.reset({
        name: "",
        slug: "",
        description: "",
        shortDesc: "",
        price: 0,
        salePrice: 0,
        sku: generateSKU(),
        stock: 0,
        categoryId: "",
        metaTitle: "",
        metaDesc: "",
        isActive: false,
        isFeatured: false,
        attributes: {},
      });
      setSelectedCategoryId("");
      setImages([]);
    }
  }, [product, form]);

  const onSubmit = (data: any) => {
    const formdata = new FormData();
    images.map((image) => formdata.append('images', image.file));

    const productData: Partial<Product> = {
      ...data,
      attributeValues: data.attributes || {},
      tags: selectedTags
    };

    // Object.entries(productData).forEach(([key,value]) => {
    //   formdata.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
    // })
    onSave({ ...productData,images });
  };

  const onError = (errors: any) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Essential product details that customers will see
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug *</FormLabel>
                    <FormControl>
                      <Input placeholder="product-url-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      URL-friendly version of the product name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description for product listings"
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description *</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value || product?.description}
                      onChange={field.onChange}
                      placeholder="Enter detailed product description..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Specifications</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value || product?.specifications}
                      onChange={field.onChange}
                      placeholder="Enter product specifications..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Category Selection</CardTitle>
            <CardDescription>
              Choose the appropriate category for this product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  {categoryAttributesLoading ? (
                    <Skeleton className="h-6" />
                  ) : (
                    <CategorySelector
                      categories={categories}
                      value={field.value}
                      onChange={field.onChange}
                      required
                      error={form.formState.errors.categoryId?.message}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>
              Add tags to help organize and filter products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TagSelector
              selectedTagIds={selectedTags}
              onChange={setSelectedTags}
            />
          </CardContent>
        </Card>

        {/* Dynamic Attributes */}
        {selectedCategoryId &&
          categoryAttributesData?.categoryAttributes?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Product Attributes
                  {form.formState.errors.attributes && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                </CardTitle>
                <CardDescription>
                  Specific attributes for the selected category. Required fields
                  are marked with *
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryAttributesLoading ? (
                    <Skeleton className="h-6" />
                  ) : (
                    categoryAttributesData.categoryAttributes?.map(
                      (ca: any) => (
                        <DynamicAttributeInput
                          key={ca.id}
                          attribute={ca.attribute}
                          control={form.control}
                          name={`attributes.${ca.id}`}
                          required={ca.isRequired}
                          error={form.formState.errors.attributes?.[ca.id]}
                        />
                      )
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
            <CardDescription>
              Set pricing and manage inventory levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regular Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        // onChange={(e) =>
                        //   field.onChange(parseFloat(e.target.value) || 0)
                        // }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        // onChange={(e) =>
                        //   field.onChange(
                        //     e.target.value
                        //       ? parseFloat(e.target.value)
                        //       : undefined
                        //   )
                        // }
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty if not on sale
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU (Stock Keeping Unit) *</FormLabel>
                  <FormControl>
                    <Input placeholder="PROD-001" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for inventory management
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>
              Upload product images. The first image will be used as the primary
              image.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader
              productId = {product?.id}
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="seo">
            <AccordionTrigger>SEO Settings</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO-friendly title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Appears in search engine results (max 60 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDesc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description for search engines"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Appears in search engine results (max 160 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Status & Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Visibility</CardTitle>
            <CardDescription>
              Control product availability and visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Product Status</FormLabel>
                <FormDescription>
                  Active products are visible to customers
                </FormDescription>
              </div>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Featured Product</FormLabel>
                <FormDescription>
                  Featured products appear in special sections
                </FormDescription>
              </div>
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* <ProductVariantsManager /> */}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-brand-orange hover:bg-brand-orange/90"
            disabled={form.formState.isSubmitting}
          >
            {product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
