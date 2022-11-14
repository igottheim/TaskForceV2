class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :category_id, :date, :time

  belongs_to :user
  belongs_to :category

  def time
    self.object.date.strftime("%m/%d/%Y @ %H:%M")
  end

end
