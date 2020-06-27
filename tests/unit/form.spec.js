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
});
