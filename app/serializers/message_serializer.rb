class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :category_id, :date

  belongs_to :user
  belongs_to :category

  def date
    self.object.date

  end

end
