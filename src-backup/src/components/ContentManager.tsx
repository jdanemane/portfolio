import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Download, Upload, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Badge } from './ui/badge';
import { portfolioService, PortfolioProfile } from '../services/portfolioService';
import { Database } from '../types/database';

type Section = Database['public']['Tables']['sections']['Row'] & {
  items: Database['public']['Tables']['portfolio_items']['Row'][]
}
type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']

interface ContentManagerProps {
  onDataUpdate: () => void;
}

export function ContentManager({ onDataUpdate }: ContentManagerProps) {
  const [data, setData] = useState<PortfolioProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [_editingSection, setEditingSection] = useState<Section | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [importExportDialog, setImportExportDialog] = useState<'import' | 'export' | null>(null);
  const [importText, setImportText] = useState('');

  const loadData = async () => {
    try {
      setIsLoading(true);
      const portfolioData = await portfolioService.getProfile();
      setData(portfolioData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProfileUpdate = async (name: string, tagline: string) => {
    if (!data) return;
    
    try {
      await portfolioService.updateProfile({ name, tagline });
      await loadData();
      onDataUpdate();
      setIsProfileDialogOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSectionUpdate = async (section: Section) => {
    if (!data) return;
    
    try {
      await portfolioService.updateSection(section.id, section);
      await loadData();
      onDataUpdate();
      setEditingSection(null);
    } catch (error) {
      console.error('Error updating section:', error);
    }
    setIsSectionDialogOpen(false);
  };

  const handleSectionAdd = async (section: Omit<Section, 'id' | 'created_at' | 'updated_at'>) => {
    if (!data) return;
    
    try {
      await portfolioService.createSection({
        ...section,
        profile_id: data.id
      });
      await loadData();
      onDataUpdate();
      setIsSectionDialogOpen(false);
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };

  const handleSectionDelete = async (sectionId: string) => {
    if (!data) return;
    
    try {
      await portfolioService.deleteSection(sectionId);
      await loadData();
      onDataUpdate();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleItemUpdate = (sectionId: string, item: PortfolioItem) => {
    const newData = {
      ...data,
      sections: data.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(i => i.id === item.id ? item : i)
            }
          : section
      )
    };
    saveData(newData);
    setEditingItem(null);
    setIsItemDialogOpen(false);
  };

  const handleItemAdd = (sectionId: string, item: Omit<PortfolioItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    const newData = {
      ...data,
      sections: data.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      )
    };
    saveData(newData);
    setIsItemDialogOpen(false);
  };

  const handleItemDelete = (sectionId: string, itemId: string) => {
    const newData = {
      ...data,
      sections: data.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: section.items.filter(i => i.id !== itemId) }
          : section
      )
    };
    saveData(newData);
  };

  const handleExport = () => {
    const jsonData = portfolioStorage.exportData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
    setImportExportDialog(null);
  };

  const handleImport = () => {
    if (portfolioStorage.importData(importText)) {
      setData(portfolioStorage.getData());
      onDataUpdate();
      setImportText('');
      setImportExportDialog(null);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      portfolioStorage.resetToDefault();
      setData(portfolioStorage.getData());
      onDataUpdate();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content manager...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load portfolio data</p>
          <button 
            onClick={loadData}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Portfolio Content Manager</h1>
            <p className="text-muted-foreground">Manage your portfolio content, sections, and profile information</p>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={importExportDialog === 'export'} onOpenChange={(open) => !open && setImportExportDialog(null)}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setImportExportDialog('export')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Portfolio Data</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  Download your portfolio data as a JSON file for backup or transfer.
                </p>
                <DialogFooter>
                  <Button onClick={handleExport}>Download JSON</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={importExportDialog === 'import'} onOpenChange={(open) => !open && setImportExportDialog(null)}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setImportExportDialog('import')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Import Portfolio Data</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label htmlFor="import-data">Paste JSON data:</Label>
                  <Textarea
                    id="import-data"
                    placeholder="Paste your exported JSON data here..."
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    className="min-h-[300px] font-mono text-xs"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setImportExportDialog(null)}>Cancel</Button>
                  <Button onClick={handleImport} disabled={!importText.trim()}>Import Data</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <ProfileForm
                      initialData={data}
                      onSave={handleProfileUpdate}
                      onCancel={() => setIsProfileDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <p className="text-sm text-muted-foreground">{data.tagline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sections">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2>Portfolio Sections</h2>
                <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Section</DialogTitle>
                    </DialogHeader>
                    <SectionForm
                      onSave={handleSectionAdd}
                      onCancel={() => setIsSectionDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {data.sections.map((section) => (
                  <Card key={section.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{section.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Section</DialogTitle>
                            </DialogHeader>
                            <SectionForm
                              initialData={section}
                              onSave={handleSectionUpdate}
                              onCancel={() => {}}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSectionDelete(section.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              {data.sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{section.title}</CardTitle>
                    <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add New Item to {section.title}</DialogTitle>
                        </DialogHeader>
                        <ItemForm
                          onSave={(item) => handleItemAdd(section.id, item)}
                          onCancel={() => setIsItemDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{item.type}</Badge>
                              {item.year && <span className="text-xs text-muted-foreground">{item.year}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit {item.title}</DialogTitle>
                                </DialogHeader>
                                <ItemForm
                                  initialData={item}
                                  onSave={(updatedItem) => handleItemUpdate(section.id, updatedItem)}
                                  onCancel={() => {}}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleItemDelete(section.id, item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Profile Form Component
function ProfileForm({ 
  initialData, 
  onSave, 
  onCancel 
}: { 
  initialData?: PortfolioProfile; 
  onSave: (name: string, tagline: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initialData?.name || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
      </div>
      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Your professional tagline"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(name, tagline)}>Save</Button>
      </DialogFooter>
    </div>
  );
}

// Section Form Component
function SectionForm({ 
  initialData, 
  onSave, 
  onCancel 
}: { 
  initialData?: Section; 
  onSave: (section: any) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initialData?.title || '');

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="section-title">Section Title</Label>
        <Input
          id="section-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Projects, Experience, Skills"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(initialData ? { ...initialData, title } : { title, items: [] })}>
          Save
        </Button>
      </DialogFooter>
    </div>
  );
}

// Item Form Component
function ItemForm({ 
  initialData, 
  onSave, 
  onCancel 
}: { 
  initialData?: PortfolioItem; 
  onSave: (item: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || 'project' as const,
    year: initialData?.year || '',
    company: initialData?.company || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    details: initialData?.details || '',
    content: initialData?.content || '',
    url: initialData?.url || '',
    tech: initialData?.tech?.join(', ') || ''
  });

  const handleSubmit = () => {
    const item = {
      ...formData,
      tech: formData.tech ? formData.tech.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      id: initialData?.id || generateId()
    };
    onSave(item);
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="item-title">Title</Label>
          <Input
            id="item-title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="item-type">Type</Label>
          <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="role">Role/Experience</SelectItem>
              <SelectItem value="skill">Skill</SelectItem>
              <SelectItem value="info">Information</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="item-year">Year</Label>
          <Input
            id="item-year"
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
            placeholder="2024 or 2023-Present"
          />
        </div>
        <div>
          <Label htmlFor="item-company">Company</Label>
          <Input
            id="item-company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="item-location">Location</Label>
          <Input
            id="item-location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="item-description">Description</Label>
        <Textarea
          id="item-description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description..."
        />
      </div>

      <div>
        <Label htmlFor="item-details">Details</Label>
        <Textarea
          id="item-details"
          value={formData.details}
          onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
          placeholder="Detailed information..."
        />
      </div>

      <div>
        <Label htmlFor="item-content">Content</Label>
        <Textarea
          id="item-content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Additional content..."
        />
      </div>

      <div>
        <Label htmlFor="item-tech">Technologies (comma-separated)</Label>
        <Input
          id="item-tech"
          value={formData.tech}
          onChange={(e) => setFormData(prev => ({ ...prev, tech: e.target.value }))}
          placeholder="React, TypeScript, Node.js"
        />
      </div>

      <div>
        <Label htmlFor="item-url">URL</Label>
        <Input
          id="item-url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogFooter>
    </div>
  );
}