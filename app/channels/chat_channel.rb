

class ChatChannel < ApplicationCable::Channel

  def subscribed
    puts "#{params[:user][:id]}"
    puts "subscribed"*10
    stop_all_streams
    # user = User.find_by(id:params[:user_id])
    stream_from "chat_#{params[:room]}"
    ActionCable.server.broadcast("chat_#{params[:room]}", { date: Time.now.strftime("%m/%d/%Y @ %I:%M%p" ), user: params[:user], user_id: params[:user][:id], category_id: "#{params[:category].to_i}",content: "#{params[:user][:first_name]} has entered the #{params[:room]} room", room:params[:room], event_type: "enter", status: 'online' })
   
  end

  def receive(data)
    puts "received"*10
    message = Message.create(content: data['content'], user_id: params[:user][:id], category_id: "#{params[:category].to_i}", date: Time.now+ Time.zone_offset('EST'))
    ActionCable.server.broadcast("chat_#{params[:room]}", {user_id: params[:user][:id], user: params[:user], category_id: "#{params[:category].to_i}", content: message, event_type: "message"})
  end

  def unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room]}", { date: Time.now.strftime("%m/%d/%Y @ %I:%M%p" ), user: params[:user],user_id: params[:user][:id],category_id: "#{params[:category].to_i}", content: "#{params[:user][:first_name]} has left the #{params[:room]} room", event_type: "exit", status: 'offline'})
   
  end


 
  # def appear(data)
  #   stream_from "chat_#{params[:room]}"
  #   ActionCable.server.broadcast("chat_#{params[:room]}", { user_id: params[:user][:id], category_id: "#{params[:category].to_i}",content: "#{params[:user][:first_name]} has streaming line 29 the #{params[:room]} room", room:params[:room], event_type: "enter", status: 'online' })
  # end
 
  # def away
  #   current_user.away
  # end

end
