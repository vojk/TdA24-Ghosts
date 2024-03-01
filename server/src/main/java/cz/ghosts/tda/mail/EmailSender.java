package cz.ghosts.tda.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailSender {

    @Autowired
    private JavaMailSender emailSender;


    public void sendEmailInfoAboutReservDeclineClient(String to, String subject, String firstname, String middlename, String lastname, String lastname_lect, String datum, String cas_od, String cas_do) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@tda.cz");
        message.setTo(to);
        message.setSubject(subject);
        String template = "Vážený/ná " + firstname + " " + middlename + " " + lastname + ",\n" +
                "\n" +
                "Učitel/ka " + lastname_lect + " zrušila Vaši rezervaci ke dni " + datum + " v čase " + cas_od + " - " + cas_do + ". \n" +
                "Pokud se domníváte že se jedná o chybu, kontaktujte Vašeho učitele.";
        message.setText(template);

        emailSender.send(message);
        System.out.println("Email sent to: " + to);
    }

    public void sendEmailInfoAboutReservDeclineLecturer(String to, String subject, String firstname, String middlename, String lastname, String firstname_lect, String middlename_lect, String lastname_lect, String datum, String cas_od, String cas_do) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@tda.cz");
        message.setTo(to);
        message.setSubject(subject);
        String template = "Vážený/ná " + firstname_lect + " " + middlename_lect + " " + lastname_lect + ",\n" +
                "\n" +
                "Zrušil/a jste schůzku klientu "  + firstname + " " + middlename + " " + lastname + "na den " + datum + " v čase " + cas_od + " - " + cas_do + ". \n";
        message.setText(template);

        emailSender.send(message);
        System.out.println("Email sent to: " + to);
    }

    public void sendEmailInfoAboutPreReserveInformativeClient(String to, String subject, String firstname, String middlename, String lastname, String lastname_lect,  String datum, String cas_od, String cas_do) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@tda.cz");
        message.setTo(to);
        message.setSubject(subject);
        String template = "Vážený/ná" + firstname + middlename + lastname +",\n"
                + "Vaše rezervace byla předčasné domluvena na den " + datum + " v čase " + cas_od + " - " + cas_do + " u učitele/ky " + lastname_lect + ". \n";
        message.setText(template);

        emailSender.send(message);
        System.out.println("Email sent to: " + to);
    }

    public void sendEmailInfoPreReservDeclineLecturer(String to, String subject, String firstname, String middlename, String lastname, String firstname_lect, String middlename_lect, String lastname_lect, String datum, String cas_od, String cas_do, String telefon, String mail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@tda.cz");
        message.setTo(to);
        message.setSubject(subject);
        String template = "Vážený/ná " + firstname_lect + " " + middlename_lect + " " + lastname_lect + ",\n" +
                "\n" +
                "Klient "  + firstname + " " + middlename + " " + lastname + " si předběžně rezervoval schůzku na den " + datum + " v čase " + cas_od + " - " + cas_do + ". \n" +
                "Kontaktní údaje na klienta: Telefon: " + telefon + " \n"+
                "                            Mail: " + mail + " \n"+
                "Zároveň bychom vás chtěli požádat o potvrzení schůzky v administraci účtu";
        message.setText(template);

        emailSender.send(message);
        System.out.println("Email sent to: " + to);
    }

    public void sendEmailInfoAboutPConfirmationReserveInformativeClient(String to, String subject, String firstname, String middlename, String lastname, String firstname_lect, String middlename_lect, String lastname_lect,  String datum, String cas_od, String cas_do) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@tda.cz");
        message.setTo(to);
        message.setSubject(subject);
        String template = "Vážený/ná" + firstname + middlename + lastname +",\n"
                + "Učitel/ka " + lastname_lect + " potvrdil/a vaší schůzku na den " + datum + " v čase " + cas_od + " - " + cas_do + " u učitele/ky " + lastname_lect + ". \n";
        message.setText(template);

        emailSender.send(message);
        System.out.println("Email sent to: " + to);
    }

    public void sendEmailInfoAboutConfirmationReserveLecturer(String to, String subject, String firstname, String middlename, String lastname, String firstname_lect, String middlename_lect, String lastname_lect, String datum, String cas_od, String cas_do) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@tda.cz");
        message.setTo(to);
        message.setSubject(subject);
        String template = "Vážený/ná " + firstname_lect + " " + middlename_lect + " " + lastname_lect + ",\n" +
                "\n" +
                "Potvrdil/a jste schůzku klientu "  + firstname + " " + middlename + " " + lastname + "na den " + datum + " v čase " + cas_od + " - " + cas_do + ". \n";
        message.setText(template);

        emailSender.send(message);
        System.out.println("Email sent to: " + to);
    }


}

