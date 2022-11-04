class ChatChannel < ApplicationCable::Channel

  def subscribed
    stream_from "chat_#{params[:room]}"
    ActionCable.server.broadcast("chat_#{params[:room]}", { user_id: current_user.id, content: "#{current_user.first_name} has entered the #{params[:room]} room", room:params[:room], event_type: "enter" })

  end

  def receive(data)
    message = Message.create(content: data['content'], user_id: current_user.id)
    ActionCable.server.broadcast("chat_#{params[:room]}", {content: message, event_type: "message"})
  end

  def unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room]}", { user_id: current_user.id, content: "#{current_user.first_name} has left the #{params[:room]}", event_type: "exit"})
  end

end
