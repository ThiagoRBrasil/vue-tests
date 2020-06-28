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
    wrapper.find('.form_input_name').setValue('thiago');
    wrapper.find('.form_input_lastname').setValue('brasil');

    await wrapper.vm.$forceUpdate();

    expect(wrapper.find('h2').text()).toBe('Welcome thiago brasil');
  });

  describe('computed', () => {
    describe('fullname', () => {
      it("should be equals to 'name lastname'", () => {
        const wrapper = shallowMount(Form, {
          data: () => ({ name: 'edimo', lastName: 'sousa' }),
        });
        expect(wrapper.vm.fullname).toBe('edimo sousa');
      });
    });
    describe('isFormCompleted', () => {
      describe('When has name and lastName', () => {
        describe('And name and lastName are valids', () => {
          it('should be true', () => {
            const wrapper = shallowMount(Form, {
              data: () => ({ name: 'edimo', lastName: 'sousa' }),
            });
            expect(wrapper.vm.isFormCompleted).toBe(true);
          });
        });

        describe('And name and lastName are NOT valids', () => {
          it('should be false When name length is lesser than 2', () => {
            const wrapper = shallowMount(Form, {
              data: () => ({ name: 'e', lastName: 'sousa' }),
            });
            expect(wrapper.vm.isFormCompleted).toBe(false);
          });
          it('should be false When lastName length is lesser than 2', () => {
            const wrapper = shallowMount(Form, {
              data: () => ({ name: 'edimo', lastName: 's' }),
            });
            expect(wrapper.vm.isFormCompleted).toBe(false);
          });
          it('should be false When name contains number', () => {
            const wrapper = shallowMount(Form, {
              data: () => ({ name: 'e123', lastName: 'sousa' }),
            });
            expect(wrapper.vm.isFormCompleted).toBe(false);
          });
          it('should be false When lastname contains number', () => {
            const wrapper = shallowMount(Form, {
              data: () => ({ name: 'edimo', lastName: '123' }),
            });
            expect(wrapper.vm.isFormCompleted).toBe(false);
          });
        });
      });

      it('should be false when has only name', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({ name: 'edimo', lastName: '' }),
        });
        expect(wrapper.vm.isFormCompleted).toBe(false);
      });

      it('should be false when has only lastName', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({ name: '', lastName: 'sousa' }),
        });
        expect(wrapper.vm.isFormCompleted).toBe(false);
      });

      it('should be false when has (name and lastName) empty', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({ name: '', lastName: '' }),
        });
        expect(wrapper.vm.isFormCompleted).toBe(false);
      });
    });
  });

  describe('Welcome message', () => {
    describe('When is form completed', () => {
      it('should show welcome message', () => {
        const wrapper = shallowMount(Form, {
          data: () => ({ name: 'thiago', lastName: 'brasil' }),
        });

        expect(wrapper.find('.form_h2_welcome_message').text()).toBe('Welcome thiago brasil');
        expect(wrapper.find('.form_h2_welcome_message').attributes('style')).not.toBe(
          'display: none;',
        );
      });
    });

    describe('When form is not completed', () => {
      it('not show welcome message', async () => {
        const wrapper = shallowMount(Form, {
          data: () => ({ name: 'edimo', lastName: '' }),
        });

        expect(wrapper.find('.form_h2_welcome_message').attributes('style')).toBe('display: none;');
      });
    });
  });
  describe('Address', () => {
    describe('When name and lastname are filled', () => {
      it('should has Address label', () => {
        const wrapper = shallowMount(Form, {
          computed: { isFormCompleted: () => true },
        });
        expect(wrapper.find('.form_h1_address').text()).toBe('Address');
        expect(wrapper.find('.form_h1_address').attributes('style')).not.toBe('display: none;');
      });
    });

    describe('When name and lastname are NOT filled', () => {
      it('should NOT has Address label', () => {
        const wrapper = shallowMount(Form, {
          computed: { isFormCompleted: () => false },
        });
        expect(wrapper.find('.form_h1_address').attributes('style')).toBe('display: none;');
      });
    });

    describe('Validations', () => {
      describe('hasOnlyLetters', () => {
        describe('When has only letters', () => {
          it('return true', () => {
            const wrapper = shallowMount(Form);

            expect(wrapper.vm.hasOnlyLetters('thiago')).toBe(true);
          });
          it('return false', () => {
            const wrapper = shallowMount(Form);

            expect(wrapper.vm.hasOnlyLetters('123')).toBe(false);
          });
        });
      });
      describe('isValidString', () => {
        describe('When string is valid', () => {
          it('return true', () => {
            const wrapper = shallowMount(Form);

            expect(wrapper.vm.isValidString('thiago')).toBe(true);
          });
        });
        describe('When string is NOT valid', () => {
          it('return false', () => {
            const wrapper = shallowMount(Form);

            expect(wrapper.vm.isValidString('t')).toBe(false);
          });
        });
      });
    });
  });
  describe('!!', () => {
    it('return true when receive a string', () => {
      expect(!!'thigo').toBe(true);

      expect(!!false).toBe(false);
      expect(!!NaN).toBe(false);
      expect(!!0).toBe(false);
      expect(!!null).toBe(false);
      expect(!!undefined).toBe(false);
      expect(!!'').toBe(false);
    });
  });
});
