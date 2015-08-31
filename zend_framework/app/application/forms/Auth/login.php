<?php
// located at application/forms/Auth/Login.php

class Default_Form_Auth_Login extends Zend_Form {

    public function init() {
        $this->setMethod('post');

        $this->addElement(
            'text', 'username', [
                'label' => 'Username:',
                'required' => true,
                'filters'    => ['StringTrim'],
            ]);

        $this->addElement('password', 'password', [
            'label' => 'Password:',
            'required' => true,
            ]);

        $this->addElement('submit', 'submit', [
            'ignore'   => true,
            'label'    => 'Login',
            ]);

    }

    public function render(){
        $element = $this->getElement()
    }

}