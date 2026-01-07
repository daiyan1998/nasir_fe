import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, CloudCog } from "lucide-react";
import { toast } from "sonner";
import { Tag } from "@/types/Tag.type";
import { generateSlug } from "@/lib/utils";
import {
  useCreateBrand,
  useDeleteBrand,
  useUpdateBrand,
} from "@/hooks/mutations/useBrandMutation";
import { useGetBrands } from "@/hooks/queries/useBrandQuery";
import { Brand } from "@/types/Brand.type";

export default function Brands() {
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { data: brandsData } = useGetBrands();
  console.log(brandsData);
  const brands = brandsData?.data;

  // const [tags, setTags] = useState<Tag[]>()
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: "",
    slug: "",
    isActive: true,
  });

  const columns = [
    {
      key: "name" as keyof Brand,
      header: "Name",
      sortable: true,
      render: (brand: Brand) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{brand.name}</span>
        </div>
      ),
    },
    {
      key: "slug" as keyof Brand,
      header: "Slug",
      sortable: true,
    },
    {
      key: "isActive" as keyof Brand,
      header: "Status",
      sortable: true,
      render: (brand: Brand) => (
        <Badge variant={brand.isActive ? "default" : "secondary"}>
          {brand.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    // {
    //   key: 'createdAt' as keyof Tag,
    //   header: 'Created',
    //   sortable: true,
    // },
    {
      key: "actions" as const,
      header: "Actions",
      render: (brand: Brand) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(brand)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(brand)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      isActive: brand.isActive,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (item: Brand) => {
    deleteBrand(item.id);
  };

  const handleBulkDelete = (items: Brand[]) => {
    const ids = items.map((brand) => brand.id);
    toast.success(`${ids.length} brands deleted successfully`);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingBrand) {
      updateBrand({ id: editingBrand.id, brand: formData });
    } else {
      const newBrand: Omit<Brand, "id"> = {
        name: formData.name!,
        slug: formData.slug!,
        isActive: formData.isActive ?? true,
      };
      createBrand(newBrand);
    }

    handleCloseForm();
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBrand(null);
    setFormData({
      name: "",
      slug: "",
      isActive: true,
    });
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-muted-foreground mt-2">
            Manage product tags for better organization
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      <DataTable
        data={brands}
        columns={columns}
        onBulkDelete={handleBulkDelete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingBrand ? "Edit Brand" : "Add New Brand"}
        description="Fill in the details below to create or update a brand"
        className="max-w-lg"
      >
        <form onSubmit={handleSaveBrand} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., New Brand"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="new-brand"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active</Label>
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseForm}>
              Cancel
            </Button>
            <Button type="submit">
              {editingBrand ? "Update Brand" : "Create Brand"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
