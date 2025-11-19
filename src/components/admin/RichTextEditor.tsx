import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { TableKit } from '@tiptap/extension-table'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote,
  Undo,
  Redo
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
import { Table, Columns, Rows, Trash } from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "Start typing...",
  className 
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TableKit.configure({
        table: { resizable: true },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none p-4 focus:outline-none min-h-[150px]'
      }
    }
  })

  if (!editor) {
    return null
  }

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    children 
  }: { 
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode 
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-muted"
      )}
    >
      {children}
    </Button>
  )

  return (
    <div className={cn("border rounded-md", className)}>
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Italic className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        >
          <Quote className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
        >
          <Undo className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
        >
          <Redo className="h-4 w-4" />
        </MenuButton>
      <TableDropdown editor={editor} />
      </div>

      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="min-h-[150px]"
        placeholder={placeholder}
      />
    </div>
  )
}

function TableDropdown({ editor }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Table className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Table</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <Table className="w-4 h-4 mr-2" />
          Insert table
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Rows</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
          <Rows className="w-4 h-4 mr-2" />
          Add row before
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
          <Rows className="w-4 h-4 mr-2" />
          Add row after
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
          <Trash className="w-4 h-4 mr-2" />
          Delete row
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Columns</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
          <Columns className="w-4 h-4 mr-2" />
          Add column before
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
          <Columns className="w-4 h-4 mr-2" />
          Add column after
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
          <Trash className="w-4 h-4 mr-2" />
          Delete column
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Advanced</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => editor.chain().focus().mergeCells().run()}>
          Merge cells
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().splitCell().run()}>
          Split cell
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
          Toggle header row
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
          Toggle header column
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()}>
          <Trash className="w-4 h-4 mr-2" />
          Delete table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
