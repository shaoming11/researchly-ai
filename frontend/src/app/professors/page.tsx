"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Search, ArrowLeft, MapPin, BookOpen, TrendingUp } from "lucide-react"
import {
  searchProfessors,
  getUniqueUniversities,
  getUniqueDepartments,
  getUniqueResearchAreas,
  type Professor,
} from "@/lib/professors-data"
import Link from "next/link"

export default function ProfessorsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedResearchArea, setSelectedResearchArea] = useState<string>("all")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin")
    }
  }, [user, isLoading, router])

  const filteredProfessors = useMemo(() => {
    return searchProfessors(searchQuery, {
      university: selectedUniversity === "all" ? undefined : selectedUniversity,
      department: selectedDepartment === "all" ? undefined : selectedDepartment,
      researchArea: selectedResearchArea === "all" ? undefined : selectedResearchArea,
    })
  }, [searchQuery, selectedUniversity, selectedDepartment, selectedResearchArea])

  const universities = getUniqueUniversities()
  const departments = getUniqueDepartments()
  const researchAreas = getUniqueResearchAreas()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedUniversity("all")
    setSelectedDepartment("all")
    setSelectedResearchArea("all")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">Researchly AI</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors pb-5" >
            <ArrowLeft className="w-4 h-4" />
                Dashboard
        </Link>
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Professor Database</h1>
          <p className="text-muted-foreground">Find and connect with professors in your field</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search professors, universities, or research areas</Label>
                <Input
                  id="search"
                  placeholder="e.g., machine learning, Stanford, Dr. Smith"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>University</Label>
                <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All universities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All universities</SelectItem>
                    {universities.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Research Area</Label>
                <Select value={selectedResearchArea} onValueChange={setSelectedResearchArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="All research areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All research areas</SelectItem>
                    {researchAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(searchQuery ||
              selectedUniversity !== "all" ||
              selectedDepartment !== "all" ||
              selectedResearchArea !== "all") && (
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {filteredProfessors.length} professor{filteredProfessors.length !== 1 ? "s" : ""} found
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessors.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
        </div>

        {filteredProfessors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2">No professors found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function ProfessorCard({ professor }: { professor: Professor }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {professor.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {professor.title} • {professor.university}
            </CardDescription>
          </div>
          {professor.responseRate && (
            <Badge variant={professor.responseRate > 80 ? "default" : "secondary"} className="ml-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              {professor.responseRate}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Department</p>
          <Badge variant="outline">{professor.department}</Badge>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Research Areas</p>
          <div className="flex flex-wrap gap-1">
            {professor.researchAreas.slice(0, 3).map((area, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {area}
              </Badge>
            ))}
            {professor.researchAreas.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{professor.researchAreas.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Recent Publications</p>
          <div className="space-y-1">
            {professor.recentPublications.slice(0, 2).map((pub, index) => (
              <p key={index} className="text-xs text-muted-foreground line-clamp-1">
                <BookOpen className="w-3 h-3 inline mr-1" />
                {pub}
              </p>
            ))}
            {professor.recentPublications.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{professor.recentPublications.length - 2} more publications
              </p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button className="w-full" size="sm" asChild>
            <Link href={`/compose?professor=${professor.id}`}>
              <Mail className="w-4 h-4 mr-2" />
              Compose Email
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
