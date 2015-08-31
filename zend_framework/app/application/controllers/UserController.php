<?php

class IndexController extends Zend_Controller_Action {

	public function init() {
		$ctrl  = Zend_Controller_Front::getInstance();
		$router = $ctrl->getRouter(); // returns a rewrite router by default

		// Assumes
		// $router->addRoute('user', new Zend_Controller_Router_Route('user/:username'));
	}

	public function indexAction(){

		$this->view->users = $em->createQuery('select u from ZC\Entity\User u')->execute();

	}

}