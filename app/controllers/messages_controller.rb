class MessagesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        render json: Message.all
      end

   def create
   
        message = Message.create!(content: params[:content], user_id: cookies.encrypted[:user_id], category_id: params[:category_id])
        render json: message, status: :created
        puts message
    end


        
    def destroy
      message = Message.find(params[:id])
      message.destroy
      head :no_content
  end

      
private
def record_invalid(invalid)
  render json: {errors: invalid.record.errors.full_messages}, status: :not_found
end

def message_params
  params.permit(:content, :user_id, :category_id)
end


end
