class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :first_name, :last_name

  has_many :messages, serializer: MessageSerializer
end
