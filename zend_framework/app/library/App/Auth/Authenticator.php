<?php

class App_Auth_Authenticator {

	protected $errorMessage;
	const ERR_NOT_FOUND = "User is not found";
	const ERR_BAD_PASSWORD = "Password is Invalid";

	public function getCredentials($username, $password) {
		$freeUser = App_Auth_UserLookup::findByUsername($username);

		if($freeUser){
			if($freeUser->password !== $password){
				$this->errorMessage = self::ERR_BAD_PASSWORD;
			}
		}else{
			// check for an admin
		}

		return false;
	}

	public function getErrorMessage(){
		return $this->errorMessage;
	}
}