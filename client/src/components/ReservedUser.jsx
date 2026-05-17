import { useState } from "react";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";
import { VCALENDAR, VEVENT } from "ics-js";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export default function ReservedUser({ userData }) {
  const [potvrzeno, setPotvrzeno] = useState(userData.souhlas);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function deleteUser() {
    axios.delete(`http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/${userData.uuid}`);
    document.getElementById(userData.uuid).remove();
  }

  const cal = new VCALENDAR();
  cal.addProp("VERSION", 2);
  cal.addProp("PRODID", "Teacher Digital Agency");

  const event = new VEVENT();
  event.addProp("UID");
  event.addProp("DTSTAMP", dayjs(`${userData.date_of_reserv} ${userData.from_time}`).toDate(), {
    VALUE: "DATE-TIME",
  });
  event.addProp("ATTENDEE", null, {
    CN: `${userData.firstName} ${userData.lastName}`,
    RSVP: `TRUE:mailto:${userData.email}`,
  });
  event.addProp("LOCATION", userData.location);
  cal.addComponent(event);
  const downloadFile = window.URL.createObjectURL(cal.toBlob());

  return (
    <div id={userData.uuid}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <a href={downloadFile} className="text-sm text-primary underline">
            Stáhnout do kalendáře (.ics)
          </a>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">
              {userData.firstName} {userData.middleName} {userData.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {dayjs(userData.date_of_reserv).format("D. M. YYYY")} · {userData.from_time}:00 -
              {userData.to_time}:00 · {userData.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${userData.email}`} className="underline">
              {userData.email}
            </a>
            <a href={`tel:+${userData.prefix}${userData.telephone}`} className="underline">
              +{userData.prefix} {userData.telephone}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {userData.tags
              ? userData.tags.map((tag) => (
                  <Badge key={tag.uuid} variant="secondary">
                    {tag.name}
                  </Badge>
                ))
              : null}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-end gap-3">
          {potvrzeno === 1 ? (
            <Badge className="flex items-center gap-2" variant="outline">
              <Check className="h-4 w-4" /> Schůzka potvrzena
            </Badge>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                axios.put(
                  "http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/updateTeacher",
                  { id: userData.uuid, souhlas: 1 }
                );
                setPotvrzeno(1);
              }}
            >
              Potvrdit
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => setConfirmOpen(true)}>
            <X className="mr-2 h-4 w-4" /> Zrušit
          </Button>
          <ConfirmDialog
            title="Odstranit studenta?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={deleteUser}
          >
            Vážně chcete studenta odstranit?
          </ConfirmDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
