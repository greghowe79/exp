import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Modal } from '@greghowe79/the-lib';
import { PopupContext } from '~/root';

export const PopupDisplay = component$(() => {
  const nav = useNavigate();
  const popupContext = useContext(PopupContext);
  const isModalOpen = useSignal(true);

  if (!popupContext.popup) {
    // Nessun popup da mostrare
    return null;
  }

  const { data } = popupContext.popup;

  const handleClose = $(async () => {
    isModalOpen.value = false;
    const redirectUrl = await popupContext.close();
    if (redirectUrl) {
      await nav(redirectUrl);
    }
  });

  return (
    <Modal open={isModalOpen} title={data.title} closeButtonVisible={false} primaryAction={handleClose} primaryButtonLabel={'Close'}>
      <p>{data.description}</p>
      {data.isSuccess ? <span class="success-icon">✔️</span> : <span class="error-icon">❌</span>}
    </Modal>
  );
});
