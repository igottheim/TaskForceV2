class ApplicationController < ActionController::API
  config.time_zone = 'Eastern Time (US & Canada)' 
  include ActionController::Cookies

    def hello_world
      session[:count] = (session[:count] || 0) + 1
      render json: { count: session[:count] }
    end
end
