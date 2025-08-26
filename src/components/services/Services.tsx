import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { _, getLocale } from 'compiled-i18n';
import { Link } from '@builder.io/qwik-city';

export const Services = component$(() => {
  const currentLocale = getLocale();
  useStyles$(styles);
  return (
    <>
      <header>
        <h1 class="service_main_title">Servizi offerti dal portale</h1>
        <p>Dal profilo alla visibilità: scopri cosa puoi fare</p>
      </header>

      <main class="services_container">
        <div class="highlight">
          <strong>Chiunque può registrarsi e creare la propria pagina personale gratuitamente.</strong>
          <br />
          Ma solo con l’abbonamento la pagina viene resa pubblica, visibile e completamente accessibile nel motore di ricerca.
        </div>

        <section class="section">
          <h2 class="service_subtitle">✅ Cosa puoi creare (gratuitamente)</h2>
          <p>Tutti gli utenti registrati possono creare una pagina web con:</p>
          <ul class="check-list">
            <li>Avatar (immagine profilo)</li>
            <li>Nome e cognome</li>
            <li>Descrizione professionale</li>
            <li>Fino a 3 servizi offerti</li>
            <li>Footer con posizione, email, telefono, social, sito web</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="service_subtitle">🔒 Se non attivi l’abbonamento</h2>
          <ul class="check-list">
            <li>
              La tua <strong>card personale</strong> (avatar, nome, professione, descrizione breve) è visibile nel motore di ricerca
            </li>
            <li>
              La tua pagina completa <strong>non è accessibile</strong> ai visitatori
            </li>
            <li>I tuoi contatti e dettagli rimangono nascosti</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="service_subtitle">🚀 Con l’abbonamento attivo (€4.9/mese o €39/anno)</h2>
          <ul class="check-list">
            <li>
              La tua <strong>pagina web completa viene pubblicata</strong>
            </li>
            <li>I visitatori possono vedere i tuoi contatti, descrizione e servizi</li>
            <li>Appari tra i risultati del motore di ricerca con profilo completo</li>
            <li>Ricevi più visibilità e possibilità di essere contattato</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="service_subtitle">🛠 Come funziona</h2>
          <ol>
            <li>Registrati gratuitamente</li>
            <li>Crea la tua pagina personale</li>
            <li>Attiva l’abbonamento per renderla pubblica e visibile</li>
          </ol>
        </section>

        <div class="cta">
          <Link href={`/${currentLocale}/${_('slug_signup')}/`}>Registrati gratuitamente</Link>
          <Link href={`/${currentLocale}/${_('slug_pricing')}/`}>Attiva la tua visibilità</Link>
        </div>
      </main>
    </>
  );
});
