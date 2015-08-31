<?php
namespace ZC\Entity;
/**
 *
 * @Entity(repositoryClass="User")
 * @Table(name="users")
 * @author russell
 */

class User{
	const secret = "cedba104-2711-4798-b455-632c3fc34131";

	/**
	 *
	 * @var integer $id
	 * @Column(name="id", type="integer",nullable=false)
	 * @Id
	 * @GeneratedValue(strategy="IDENTITY")
	 */
	private $id;

	/**
	 * @Column(type="string",length=60,nullable=true)
	 * @var string
	 */
	private $firstname;

	/**
	 * @Column(type="string",length=60,nullable=true)
	 * @var string
	 */
	private $lastname;

	/**
	 * @Column(type="string", length=60, nullable=false, unique=true)
	 * @var string
	 */
	private $username;

	/**
	 * @Column(type="string",length=64, nullable=true)
	 * @var string
	 */
	private $password;


	public function __get($property) {
		return $this->$property;
	}
	public function __set($property,$value) {

		if($property === "password"){
			$value = $this->$property = hash('sha256', $this->username . $value . $this::secret);;
		}

		$this->$property = $value;
	}

}

