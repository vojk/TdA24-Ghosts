import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

export function RegisterBox() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchURL = "http://7d17dc13931b9d11.app.tourdeapp.cz/api";

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${fetchURL}/tag`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      setTags(data || []);
    }
    fetchData();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.some((item) => item.uuid === tag.uuid)
        ? prev.filter((item) => item.uuid !== tag.uuid)
        : [...prev, tag]
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">Vytvořte účet a začněte vyučovat</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="Username">Username</Label>
            <Input required type="text" id="Username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Jmeno">Jméno</Label>
            <Input required autoComplete="given-name" type="text" id="Jmeno" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Prijmeni">Příjmení</Label>
            <Input required autoComplete="family-name" type="text" id="Prijmeni" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="E-Mail">E-Mail</Label>
            <Input required type="email" id="E-Mail" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Telefon">Telefonní číslo</Label>
            <Input required type="tel" id="Telefon" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Heslo">Heslo</Label>
            <Input required type="password" id="Heslo" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="PhotoUrl">Odkaz na fotku</Label>
            <Input required type="url" id="PhotoUrl" placeholder="https://example.com/uzasnafotka.jpg" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Vyberte si pomocí tagů svá zaměření</Label>
            {tags.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nepodařilo se nám načíst potřebné tagy.</p>
            ) : (
              <ScrollArea className="h-40 rounded-md border p-3">
                <div className="grid gap-2 md:grid-cols-2">
                  {tags.map((tag) => (
                    <label key={tag.uuid} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={selectedTags.some((item) => item.uuid === tag.uuid)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      {tag.name}
                    </label>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Registrovat
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
