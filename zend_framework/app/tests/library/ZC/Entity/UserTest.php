<?php
namespace ZC\Entity;
/**
 * Description of UserTest
 *
 * @author russell
 */
class UserTest extends \ModelTestCase {
	public function testCanCreateUser() {
		$this->assertInstanceOf('ZC\Entity\User', new User());
	}

	public function testCanSaveFirstAndLastNameAndRetrieveThem() {
		$u = new User();
		$u->firstname = "John";
		$u->lastname = "Smith";
		$u->username = 'username';
		$u->password = 'password';

		$em = $this->doctrineContainer->getEntityManager();
		$em->persist($u);
		$em->flush();

		$users = $em->createQuery('select u from ZC\Entity\User u')->execute();
		$this->assertEquals(1,count($users));

		$this->assertEquals('John',$users[0]->firstname);
		$this->assertEquals('Smith',$users[0]->lastname);
	}

}
