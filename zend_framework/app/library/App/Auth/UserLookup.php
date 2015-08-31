<?php

class App_Auth_UserLookup {

	private static $users = [
		"jon" => [
			'password' => "pa$$",
		],
		"emily" => "pa$$",
		"robert" => "pa$$",
		"eric" => "pa$$",
	];

	public static function findByUsername($username){
		if( array_key_exists($username, self::$users) ){
			$account = new StdClass();
			$account->role = App_Roles::Free;
			$account->username = $username;
			$account->password = self::$users[$username];
			$account->description = "free account";

			return $account;
		}
		return false;
	}

	public static function doctrineFind(){
		$em = Zend_Registry::get('doctrine')->getEntityManager();
		$qb = $em->createQueryBuilder();
		$user = $qb->select('*')
			->from('users', 'u')
			->where("username = $username");

		print $user;
	}
}