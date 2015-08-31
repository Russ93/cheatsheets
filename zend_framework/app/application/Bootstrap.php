<?php
// application/Bootstrap.php
require_once 'Zend/Loader/Autoloader.php';

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap{
	protected function _initErrors(){
		ini_set('display_errors',1);
		ini_set('display_startup_errors',1);
		error_reporting(-1);
	}

	protected function _initDoctype(){
		Zend_Session::start();
		// $this->bootstrap('view');
		// $view = $this->getResource('view');
		// $view->doctype('XHTML1_STRICT');
	}

	protected function _initAppAutoload() {
		$loader = new Zend_Application_Module_Autoloader([
			'namespace' => '',
			'basePath'  => APPLICATION_PATH,
		]);

		$loader
			->addResourceType('form', 'forms', 'Form')
			->addResourceType('model', 'models', 'Model')
			->addResourceType('dbtable', 'models/DbTable', 'Model_DbTable');

		$autoloader = Zend_Loader_Autoloader::getInstance();

		$autoloader->registerNamespace(["App_"]);

		return $loader;

	}

// 	public function _initAutoloaderNamespaces() {
// 		require_once 'Doctrine/Common/ClassLoader.php';

// 		$autoloader = \Zend_Loader_Autoloader::getInstance();
// 		$symfonyAutoloader = new \Doctrine\Common\ClassLoader('Symfony', 'Doctrine');
// 		$autoloader->pushAutoloader(array($symfonyAutoloader, 'loadClass'), 'Symfony');
// 	}

// 	protected function _initDoctrine() {
// 		$this
// 			->getApplication()
// 			->getAutoloader()
// 			->pushAutoloader(['Doctrine', 'autoload']);

// 		$manager = Doctrine_Manager::getInstance();
// 		$manager->setAttribute(Doctrine::ATTR_AUTO_ACCESSOR_OVERRIDE, true);
// 		$manager->setAttribute(
// 			Doctrine::ATTR_MODEL_LOADING,
// 			Doctrine::MODEL_LOADING_CONSERVATIVE
// 		);
// 		$manager->setAttribute(Doctrine::ATTR_AUTOLOAD_TABLE_CLASSES, true);

// 		$dsn = $this->getOption('dsn');
// 		$conn = Doctrine_Manager::connection($dsn, 'doctrine');
// 		$conn->setAttribute(Doctrine::ATTR_USE_NATIVE_ENUM, true);
// 		return $conn;
// 	}

}