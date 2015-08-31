<?php

class IndexController extends Zend_Controller_Action {

	public function init() {
		$ctrl  = Zend_Controller_Front::getInstance();
		$router = $ctrl->getRouter(); // returns a rewrite router by default
		// $router->addRoute('user', new Zend_Controller_Router_Route('user/:username', ['controller' => 'user', 'action' => 'info']));

		// Assumes
		$router->addRoute('user', new Zend_Controller_Router_Route('user/:username'));
	}

	public function indexAction(){
		// $request = $this->getRequest();
		// $loginForm = new Default_Form_Auth_Login();

		// $this->view->form = $loginForm;
	}

	public function signupAction(){
		$request = $this->getRequest();

		$u = new ZC\Entity\User();
		$u->username = $request->getPost('username');
		$u->password = $request->getPost('password');
		$u->firstname = $request->getPost('firstname');
		$u->lastname = $request->getPost('lastname');

		$em = Zend_Registry::get('doctrine')->getEntityManager();
		$em->persist($u);

		try{
			$em->flush();
		} catch (Exception $e) {
			$_SESSION['error'] = 'Caught exception: ' .  $e->getMessage();
		}

	}

	public function infoAction(){
		$username = $request->getParam('username');
	}

	public function loginAction() {
		$request = $this->getRequest();
        $db = $this->_getParam('db');

        $loginForm = new Default_Form_Auth_Login();

        if ($loginForm->isValid($request->getPost())) {

            $adapter = new Zend_Auth_Adapter_DbTable(
                $db,
                'users',
                'username',
                'password',
                'MD5(CONCAT(?, password_salt))'
                );

            $adapter->setIdentity($loginForm->getValue('username'));
            $adapter->setCredential($loginForm->getValue('password'));

            $auth   = Zend_Auth::getInstance();
            $result = $auth->authenticate($adapter);

            if ($result->isValid()) {
                $this->_helper->FlashMessenger('Successful Login');
                $this->_redirect('/');
                return;
            }

        }

        $this->view->loginForm = $loginForm;

    }


}

