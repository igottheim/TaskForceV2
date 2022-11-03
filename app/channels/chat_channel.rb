class ChatChannel < ApplicationCable::Channel

  def subscribed
    stream_from "chat_#{params[:room]}"
    ActionCable.server.broadcast("chat_#{params[:room]}", { content: "#{current_user.name} has entered the #{params[:room]}" })
  end

  def receive(data)
    message = Message.create(content: data['content'], user: current_user)
    ActionCable.server.broadcast("chat_#{params[:room]}", message)
  end

  def unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room]}", { content: "#{current_user.name} has left the #{params[:room]}" })
  end

end
