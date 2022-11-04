puts "seed starting!"


User.create(first_name: "Ian", last_name: "Gottheim", username: "iansruns", password: "ian", password_confirmation:"ian")
User.create(first_name: "Felicia", last_name: "Gottheim",username: "feliciaruns", password: "cool", password_confirmation:"cool")
User.create(first_name: "Parry", last_name: "Huang",username: "Parrycool", password: "bubbletea", password_confirmation:"bubbletea")
User.create(first_name: "Leon", last_name: "Wong",username: "Leon25", password: "codemaster", password_confirmation: "codemaster")

# Category.create(name: "Basement")
# Category.create(name:"Bathroom")
# Category.create(name:"Master Bedroom")
# Category.create(name:"Guest Bedroom")

# Room.create(category_id:1)
# Room.create(category_id:2)
# Room.create(category_id:3)
# Room.create(category_id:4)


puts "seed complete"