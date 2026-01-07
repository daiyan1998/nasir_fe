import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Modal } from "@/components/ui/modal";
import { AttributeForm } from "@/components/admin/AttributeForm";
import { CategoryAttributeAssignment } from "@/components/admin/CategoryAttributeAssignment";
import { Plus, Settings, Filter, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateAttribute,
  useDeleteAttribute,
  useImportAttributes,
  useUpdateAttribute,
} from "@/hooks/mutations/useAttributeMutation";
import { useGetAttributes } from "@/hooks/queries/useAttributeQuery";
import { useAssignAttributeToCategory } from "@/hooks/mutations/useCategoryAttributeMutation";
import { useGetCategoryAttributes } from "@/hooks/queries/useCategoryAttributeQuery";
import { ImportCSVForm } from "@/components/admin/ImportCSVForm";
import { Attribute } from "@/types/Attribute.type";
import { CategoryAttribute } from "@/types/Category.type";

export default function Attributes() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null
  );

  // hooks
  const { mutate: createAttribute } = useCreateAttribute();
  const { mutate: updateAttribute } = useUpdateAttribute();
  const { data: attributes = [] } = useGetAttributes();
  const { mutate: deleteAttribute } = useDeleteAttribute();
  const { mutate: assignAttributeToCategory } = useAssignAttributeToCategory();
  const { data: categoryAttributes = [] } = useGetCategoryAttributes();
  const { mutate: importAttributes } = useImportAttributes();

  const getTypeBadge = (type: string) => {
    const colors = {
      text: "default",
      number: "secondary",
      select: "outline",
      boolean: "destructive",
    };
    return (
      <Badge variant={colors[type as keyof typeof colors] as any}>{type}</Badge>
    );
  };

  const columns: Column<Attribute>[] = [
    {
      key: "name",
      header: "Name",
      render: (attribute) => (
        <div>
          <div className="font-medium">{attribute.name}</div>
          <div className="text-sm text-muted-foreground">{attribute.slug}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (attribute) => (
        <div className="flex items-center gap-2">
          {getTypeBadge(attribute.type)}
          {attribute.unit && (
            <span className="text-sm text-muted-foreground">
              ({attribute.unit})
            </span>
          )}
        </div>
      ),
    },
    {
      // Fix: show attribute values
      key: "attributeValues",
      header: "Values",
      render: (attribute) => (
        <div>
          {attribute.type === "SELECT" && attribute.attributeValues ? (
            <div className="text-sm">
              {attribute.attributeValues
                .slice(0, 3)
                .map((v) => v.value)
                .join(", ")}
              {attribute.attributeValues.length > 3 &&
                ` +${attribute.attributeValues.length - 3} more`}
            </div>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
    {
      key: "isFilterable",
      header: "Filterable",
      render: (attribute) => (
        <Badge variant={attribute.isFilterable ? "default" : "secondary"}>
          {attribute.isFilterable ? "Yes" : "No"}
        </Badge>
      ),
    },
    // {
    //   key: 'createdAt',
    //   header: 'Usage',
    //   render: (attribute) => {
    //     const usageCount = categoryAttributes.filter(ca => ca.attributeId === attribute.id).length
    //     return <span className="text-sm">{usageCount} categories</span>
    //   }
    // },
    {
      key: "actions",
      header: "Actions",
    },
  ];

  const filters = [
    {
      key: "type" as keyof Attribute,
      label: "Type",
      options: [
        { label: "Text", value: "TEXT" },
        { label: "Number", value: "NUMBER" },
        { label: "Select", value: "SELECT" },
        { label: "Boolean", value: "BOOLEAN" },
      ],
    },
    {
      key: "isFilterable" as keyof Attribute,
      label: "Filterable",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
  ];

  const handleEdit = (attribute: Attribute) => {
    setEditingAttribute(attribute);
    setIsFormOpen(true);
  };

  const handleDelete = (attribute: Attribute) => {
    deleteAttribute(attribute.id);
  };

  const handleSaveAttribute = (attributeData: Partial<Attribute>) => {
    if (editingAttribute) {
      updateAttribute({ id: editingAttribute.id, data: attributeData });
    } else {
      createAttribute(attributeData);
    }

    setIsFormOpen(false);
    setEditingAttribute(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAttribute(null);
  };

  const handleSaveCategoryAttributes = (
    newCategoryAttributes: CategoryAttribute[]
  ) => {
    const categoryIdAttributes = newCategoryAttributes
      .map((ca) => ({ categoryId: ca.categoryId, attributeId: ca.attributeId }))
      .filter((ca) => ca.categoryId || ca.attributeId);
    assignAttributeToCategory(newCategoryAttributes);
  };

  const handleDataImport = (csvData: any[]) => {
    importAttributes(csvData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attributes</h1>
          <p className="text-muted-foreground">
            Manage product attributes and their assignments to categories
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAssignmentOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Assign to Categories
          </Button>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Attribute
          </Button>
          <Button
            onClick={() => setIsImportOpen(true)}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Import Attributes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attributes
            </CardTitle>
            <Type className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attributes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filterable</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attributes.filter((a) => a.isFilterable).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Select Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attributes.filter((a) => a.type === "SELECT").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryAttributes.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attributes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Attributes</CardTitle>
          <CardDescription>
            Manage product attributes that can be assigned to categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={attributes}
            columns={columns}
            searchKey="name"
            filters={filters}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
      {/* Import CSV modal */}
      <Modal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)}>
        <ImportCSVForm onDataImport={handleDataImport} />
      </Modal>

      {/* Attribute Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingAttribute ? "Edit Attribute" : "Add New Attribute"}
        description={
          editingAttribute
            ? "Update attribute information"
            : "Create a new product attribute"
        }
        className="max-w-2xl"
      >
        <AttributeForm
          attribute={editingAttribute}
          onSave={handleSaveAttribute}
          onCancel={handleCloseForm}
        />
      </Modal>

      {/* Category Attribute Assignment Modal */}
      <Modal
        isOpen={isAssignmentOpen}
        onClose={() => setIsAssignmentOpen(false)}
        title="Assign Attributes to Categories"
        description="Configure which attributes should be available for each category"
        className="max-w-4xl"
      >
        <CategoryAttributeAssignment
          attributes={attributes}
          categoryAttributes={categoryAttributes}
          onSave={handleSaveCategoryAttributes}
          onCancel={() => setIsAssignmentOpen(false)}
        />
      </Modal>
    </div>
  );
}
