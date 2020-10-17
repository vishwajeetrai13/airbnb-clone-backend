
	createdAt	updatedAt	email	password	dob	profilePictureUrl

const jane = await User.create({ firstName: "Jane", lastName: "Doe",introductionOfUser:"yo",createdAt:"new",updatedAt:"old",email:"abc@gmail.com",password:"123",dob:"01", profilePictureUrl:""});
console.log("Jane's auto-generated ID:", jane.id);