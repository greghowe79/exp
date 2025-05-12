import { _ } from 'compiled-i18n';
import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Modal } from '@greghowe79/the-lib';
import { Form, server$ } from '@builder.io/qwik-city';

// export const useAddUser = routeAction$(async (data, requestEvent) => {
//   // This will only run on the server when the user submits the form (or when the action is called programmatically)
//   const userID = await db.users.add({
//     firstName: data.firstName,
//     lastName: data.lastName,
//   });
//   return {
//     success: true,
//     userID,
//   };
// });

export const addUser = server$(function (email: string, password: string) {
  const greeting = `Hello ${email} ${password}`;
  console.log('Prints in the server', greeting);
  return greeting;
});

export const Login = component$(() => {
  useStylesScoped$(styles);
  const open = useSignal(true);
  const email = useSignal('');
  const password = useSignal('');

  const createNewUser = $(async () => {
    const greeting = await addUser(email.value, password.value);
    alert(greeting);
  });

  return (
    <div class="login-layout">
      <div class="login-left">
        <Modal
          open={open}
          title={_('navbar_login')}
          closeButtonVisible={false}
          primaryButtonLabel={_('form_submit')}
          primaryAction={createNewUser}
        >
          <h1>{_('navbar_login')}</h1>
          <Form class="form">
            <label>
              First name: <input bind:value={email} />
            </label>
            <label>
              Last name: <input bind:value={password} />
            </label>
          </Form>
          {/* {action.value?.success && (
            // When the action is done successfully, the `action.value` property will contain the return value of the action
            <p>User {action.value.userID} added successfully</p>
          )} */}
        </Modal>
      </div>
      <div class="login-right"></div>
    </div>
  );
});
