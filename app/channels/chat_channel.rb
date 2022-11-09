class ChatChannel < ApplicationCable::Channel

  def subscribed
    puts "#{params[:user][:id]}"
    puts "subscribed"*10
    stop_all_streams
    # user = User.find_by(id:params[:user_id])
    stream_from "chat_#{params[:room]}"
    ActionCable.server.broadcast("chat_#{params[:room]}", { user_id: params[:user][:id], category_id: "#{params[:category].to_i}",content: "#{params[:user][:first_name]} has entered the #{params[:room]} room", room:params[:room], event_type: "enter" })

  end

  def receive(data)
    puts "received"*10
    message = Message.create(content: data['content'], user_id: params[:user][:id], category_id: "#{params[:category].to_i}" )
    ActionCable.server.broadcast("chat_#{params[:room]}", {user_id: params[:user][:id], category_id: "#{params[:category].to_i}", content: message, event_type: "message"})
  end

  def unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room]}", { user_id: current_user.id,category_id: "#{params[:category].to_i}", content: "#{current_user.first_name} has left the #{params[:room]}", event_type: "exit"})
  end

end
