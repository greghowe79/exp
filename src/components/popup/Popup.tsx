import { $, component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Modal } from '@greghowe79/the-lib';
import { PopupContext } from '~/root';

export const PopupDisplay = component$(() => {
  const nav = useNavigate();
  const popupContext = useContext(PopupContext);
  const isModalOpen = useSignal(true);

  useTask$(({ track }) => {
    track(() => popupContext.popup);
    isModalOpen.value = !!popupContext.popup;
  });

  if (!popupContext.popup) {
    return null;
  }

  const { data } = popupContext.popup;

  const handleClose = $(async () => {
    if (data.onPrimaryAction) {
      await data.onPrimaryAction();
    }
    const redirectUrl = await popupContext.close();
    if (redirectUrl) {
      await nav(redirectUrl);
    }
  });

  return (
    <div style={{ position: 'fixed', zIndex: 6000 }}>
      <Modal
        open={isModalOpen}
        title={data.title}
        closeButtonVisible={false}
        primaryAction={handleClose}
        primaryButtonLabel={data.primaryButtonLabel || 'Close'}
        type="small"
      >
        <p>{data.description}</p>
        {data.isSuccess ? <span class="success-icon">✔️</span> : <span class="error-icon">❌</span>}
      </Modal>
    </div>
  );
});
