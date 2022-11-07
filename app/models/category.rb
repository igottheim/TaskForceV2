class Category < ApplicationRecord
    has_many :messages
    has_many :users, through: :messages
    has_many :rooms
end
