import { shallowMount } from '@vue/test-utils';
import Form from '@/components/Form.vue';

describe('Form', () => {
  it('is valid component', () => {
    const wrapper = shallowMount(Form);
    expect(wrapper.exists()).toBe(true);
  });
  it('should has h1 equals to Form', () => {
    const wrapper = shallowMount(Form);
    expect(wrapper.find('h1').text()).toMatch('Form');
  });

  it('should show "Welcome {name} {surname}"', async () => {
    const wrapper = shallowMount(Form);
    wrapper.find('.form_label_name').setValue('thiago');
    wrapper.find('.form_label_lastname').setValue('brasil');

    await wrapper.vm.$forceUpdate();

    expect(wrapper.find('h2').text()).toBe('Welcome thiago brasil');
  });

  describe('computed', () => {
    describe('fullname', () => {
      it('should be equals to {name lastname}', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({
            name: 'thiago',
            lastName: 'brasil',
          }),
        });
        expect(wrapper.vm.fullname).toBe('thiago brasil');
      });
      describe('isFormCompleted', () => {
        it('should be true when has name and lastName', () => {
          const wrapper = shallowMount(Form, {
            data: () => ({
              name: 'thiago',
              lastName: 'brasil',
            }),
          });
          expect(wrapper.vm.isFormCompleted).toBe(true);
        });
        it('should be false when has only name', () => {
          const wrapper = shallowMount(Form, {
            data: () => ({
              name: 'thiago',
            }),
          });
          expect(wrapper.vm.isFormCompleted).toBe(false);
        });
        it('should be false when has only lastName', () => {
          const wrapper = shallowMount(Form, {
            data: () => ({
              lastName: 'brasil',
            }),
          });
          expect(wrapper.vm.isFormCompleted).toBe(false);
        });
        it('should be false when has (name and lastName) empty', () => {
          const wrapper = shallowMount(Form, {
            data: () => ({
              name: '',
              lastName: '',
            }),
          });
          expect(wrapper.vm.isFormCompleted).toBe(false);
        });
      });
    });
  });

  describe('Welcome message', () => {
    describe('When is form completed', () => {
      it('should show welcome message', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({
            name: 'thiago',
            lastName: 'brasil',
          }),
        });
        expect(wrapper.find('.form_h2_welcome_message').text()).toMatch('Welcome thiago brasil');
        expect(wrapper.find('.form_h2_welcome_message').exists()).toBe(true);
      });
    });
    describe('When is form completed', () => {
      it('should not show welcome message', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({
            name: 'thiago',
            // lastName: 'brasil',
          }),
        });
        expect(wrapper.find('.form_h2_welcome_message').exists()).toBe(false);
      });
    });
  });
});
