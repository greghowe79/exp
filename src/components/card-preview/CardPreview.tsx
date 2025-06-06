import { component$ } from '@builder.io/qwik';

const CardPreview = component$(() => {
  // Finto contenuto (da sostituire con dati utente reali)
  return (
    <div class="border rounded shadow p-4 w-80 bg-white">
      {/*   <img src="" alt="Foto" class="w-20 h-20 rounded-full mb-2" /> */}
      <h3 class="font-bold text-lg">Mario Rossi</h3>
      <p class="text-sm text-gray-600">Roma, Italia</p>
      <p class="text-sm mt-2">📞 333-1234567</p>
      <a href="mailto:mario@example.com" class="text-blue-600">
        mario@example.com
      </a>
    </div>
  );
});
export default CardPreview;
