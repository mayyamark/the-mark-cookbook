import Swal from 'sweetalert2';

const sendCategory = (createCategory, setCreating) => {
  Swal.fire({
    title: 'Ще създадеш нова категория!',
    input: 'text',
    inputLabel: 'Въведи име на новата категория:',
    inputPlaceholder: 'Кликни, за да напишеш категорията...',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Трябва да въведеш категория!';
      }
      if (value.length < 3) {
        return 'Категорията трябва да съдържа поне 3 символа!';
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      createCategory({ categoryName: result.value });
      Swal.fire(
        'Жестоко-о-о!',
        `Създаде категория '${result.value}'!`,
        'success',
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      setCreating(false);
    }
  });
};

export default sendCategory;