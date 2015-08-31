<?php

class GuestbookController extends Zend_Controller_Action {

	public function init() {
		$ctrl  = Zend_Controller_Front::getInstance();
		$router = $ctrl->getRouter(); // returns a rewrite router by default

		// Assumes post action
		$router->addRoute('post', new Zend_Controller_Router_Route('post/:id'));
	}

	public function indexAction(){
		$guestbook = new Application_Model_GuestbookMapper();
		$this->view->entries = $guestbook->fetchAll();
	}

	public function postAction(){
		$postId = $request->getParam('id');

		$guestbook = new Application_Model_GuestbookMapper();
		$this->view->entries = $guestbook->find($postId);
	}

	public function signAction() {
		$request = $this->getRequest();
		$form = new Application_Form_Guestbook();

		if ($request->isPost() && $form->isValid($request->getPost())) {
			$comment = new Application_Model_Guestbook($form->getValues());
			$mapper  = new Application_Model_GuestbookMapper();
			$mapper->save($comment);
			return $this->_helper->redirector('index');
		}

		$this->view->form = $form;
	}


}



