class User < ApplicationRecord
    has_secure_password
    has_many :messages
    has_many :categories, through: :messages
    validates_uniqueness_of :username
end
