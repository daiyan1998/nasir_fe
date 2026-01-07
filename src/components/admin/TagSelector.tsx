import { useState } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetTags } from "@/hooks/queries/useTagQuery";

interface TagSelectorProps {
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
}

export function TagSelector({ selectedTagIds, onChange }: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const { data: tagsData } = useGetTags();
  const tags = tagsData?.data;

  const selectedTags = tags?.filter((tag) => selectedTagIds.includes(tag.id));

  const handleToggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter((id) => id !== tagId));
    } else {
      onChange([...selectedTagIds, tagId]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onChange(selectedTagIds.filter((id) => id !== tagId));
  };

  if (!tags) return null;
  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start"
          >
            {selectedTags.length > 0
              ? `${selectedTags.length} tag(s) selected`
              : "Select tags..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {tags
                // .filter((tag) => tag?.active)
                .map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={() => handleToggleTag(tag.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTagIds.includes(tag.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: tag.color || "#3b82f6" }}
                    />
                    {tag.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="gap-1"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
                borderColor: tag.color,
              }}
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
