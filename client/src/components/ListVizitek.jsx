import { useEffect, useMemo, useState } from "react";
import { Vizitka } from "./Vizitka";
import FadeInView from "./FadeInView";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";

const fetchURL = "http://7d17dc13931b9d11.app.tourdeapp.cz/api";

export function ListVizitek() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const [filterPrice, setFilterPrice] = useState([20, 700]);
  const [filterPriceRange, setFilterPriceRange] = useState([20, 700]);
  const [tagQuery, setTagQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filterCities, filterPrice, filterTags]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${fetchURL}/lecturers/`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (data && data.length) {
        const price = data.map((value) => value.price_per_hour);
        setFilterPriceRange([Math.min(...price), Math.max(...price)]);
        setFilterPrice([Math.min(...price), Math.max(...price)]);
        setData(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTags() {
      const data = await fetch(`${fetchURL}/tag`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      setTags(data || []);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      const data = await fetch(`${fetchURL}/location`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      setLocations(data || []);
    }
    fetchLocations();
  }, []);

  const toggleTag = (tag) => {
    setFilterTags((prev) =>
      prev.some((item) => item.uuid === tag.uuid)
        ? prev.filter((item) => item.uuid !== tag.uuid)
        : [...prev, tag]
    );
  };

  const toggleCity = (city) => {
    setFilterCities((prev) =>
      prev.includes(city) ? prev.filter((item) => item !== city) : [...prev, city]
    );
  };

  const filteredTags = useMemo(() => {
    const query = tagQuery.toLowerCase();
    return tags.filter((tag) => tag.name.toLowerCase().includes(query));
  }, [tags, tagQuery]);

  const filteredLocations = useMemo(() => {
    const query = cityQuery.toLowerCase();
    return locations.filter((city) => city.toLowerCase().includes(query));
  }, [locations, cityQuery]);

  const filteredDATA = data.filter((node) => {
    const tagsMatch =
      filterTags.length === 0 ||
      filterTags.every((filterTag) => node.tags.map((tag) => tag.uuid).includes(filterTag.uuid));
    const citiesMatch =
      filterCities.length === 0 || filterCities.some((filterCity) => node.location.includes(filterCity));
    const minPrice = Math.min(filterPrice[0], filterPrice[1]);
    const maxPrice = Math.max(filterPrice[0], filterPrice[1]);
    const priceMatch = node.price_per_hour >= minPrice && node.price_per_hour <= maxPrice;
    return tagsMatch && citiesMatch && priceMatch;
  });

  const lectorCount = filteredDATA.length;
  const lectorsPerPage = 4;
  const paging = filteredDATA.slice((page - 1) * lectorsPerPage, page * lectorsPerPage);
  const totalPages = Math.max(1, Math.ceil(lectorCount / lectorsPerPage));
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container py-12">
      {data.length === 0 ? (
        <FadeInView className="flex justify-center">
          <div className="text-center">
            <h2 className="font-display text-3xl text-white">Nebyl nalezen žádný lektor.</h2>
            <p className="text-white/80">Omlouváme se.</p>
          </div>
        </FadeInView>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-4xl text-white">Vyhledat lektora</h1>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="filters" className="border border-muted/30">
                <AccordionTrigger className="px-6 text-lg font-semibold">
                  Filtrujte podle místa, ceny a tagů!
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                          <Label htmlFor="tag-search">Tagy</Label>
                          <Input
                            id="tag-search"
                            placeholder="Hledejte tagy"
                            value={tagQuery}
                            onChange={(event) => setTagQuery(event.target.value)}
                          />
                          <ScrollArea className="h-40 rounded-md border p-3">
                            <div className="grid gap-2">
                              {filteredTags.map((tag) => (
                                <label key={tag.uuid} className="flex items-center gap-2 text-sm">
                                  <Checkbox
                                    checked={filterTags.some((item) => item.uuid === tag.uuid)}
                                    onCheckedChange={() => toggleTag(tag)}
                                  />
                                  {tag.name}
                                </label>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="flex flex-wrap gap-2">
                            {filterTags.map((tag) => (
                              <Badge key={tag.uuid} variant="secondary">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                          <Label htmlFor="city-search">Lokace</Label>
                          <Input
                            id="city-search"
                            placeholder="Hledejte město"
                            value={cityQuery}
                            onChange={(event) => setCityQuery(event.target.value)}
                          />
                          <ScrollArea className="h-40 rounded-md border p-3">
                            <div className="grid gap-2">
                              {filteredLocations.map((city) => (
                                <label key={city} className="flex items-center gap-2 text-sm">
                                  <Checkbox
                                    checked={filterCities.includes(city)}
                                    onCheckedChange={() => toggleCity(city)}
                                  />
                                  {city}
                                </label>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="flex flex-wrap gap-2">
                            {filterCities.map((city) => (
                              <Badge key={city} variant="outline">
                                {city}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6 grid gap-4 rounded-md border bg-card p-6 text-card-foreground">
                    <div className="space-y-2">
                      <Label>Cenové rozpětí</Label>
                      <Slider
                        value={filterPrice}
                        onValueChange={setFilterPrice}
                        min={filterPriceRange[0]}
                        max={filterPriceRange[1]}
                        step={10}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="min-price">Minimální cena</Label>
                        <Input
                          id="min-price"
                          type="number"
                          value={filterPrice[0]}
                          min={0}
                          onChange={(event) =>
                            setFilterPrice([Number(event.target.value), filterPrice[1]])
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-price">Maximální cena</Label>
                        <Input
                          id="max-price"
                          type="number"
                          value={filterPrice[1]}
                          min={0}
                          onChange={(event) =>
                            setFilterPrice([filterPrice[0], Number(event.target.value)])
                          }
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {paging.map((dataItem) => (
              <FadeInView key={dataItem.uuid}>
                <Vizitka lecturerData={dataItem} />
              </FadeInView>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            {filteredDATA.length === 0 && data.length !== 0 ? (
              <div className="text-center">
                <h2 className="font-display text-3xl text-white">Zadaným parametrům neodpovídá žádný lektor.</h2>
                <p className="text-white/80">Omlouváme se.</p>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  Předchozí
                </Button>
                {pageNumbers.map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Další
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
