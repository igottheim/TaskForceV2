class User < ApplicationRecord
    has_secure_password
    has_many :messages
    validates_uniqueness_of :username
end
