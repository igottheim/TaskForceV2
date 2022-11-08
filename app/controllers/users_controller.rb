
    class UsersController < ApplicationController
        # before_action :authorize, only: [:show]
        wrap_parameters format: []
    
        rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
        rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
            
            def index
                users = User.all
                render json: users, status: :ok
            end
                
                
            def show
                user = User.find_by(id: cookies.encrypted[:user_id])
                render json: user
            end
        
            def update
            
                user = User.find(params[:id])
                user.update!(user_params)
                render json: user, status: :ok
            end
        
        
        def create
        user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { error: user.errors.full_messages }, status: :unprocessable_entity
        end
        end
        
            def destroy
                user = User.find(params[:id])
                puts "#{user.messages}"
                user.messages.destroy
                user.destroy
                cookies.encrypted[:user_id] = "" 
        
                head :no_content
            end
        
        
        
            private 
        
            def render_not_found
                render json: {error: "User Not Found"}, status: :not_found
            end
        
            def record_invalid(invalid)
        
                render json: {errors: invalid.record.errors.full_messages}, status: :not_found
            end
        
            def user_params
                params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :id)
            end
    
            def authorize
                return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
              end
    end

