class MessagesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        render json: Message.all
      end

  #  def create
  #       message = Message.create!(content: params[:content])
  #       render json: message, status: :created
  #   end

      



private
def record_invalid(invalid)

  render json: {errors: invalid.record.errors.full_messages}, status: :not_found
end

def message_params
  params.permit(:content)
end


end
