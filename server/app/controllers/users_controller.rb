class UsersController < ApplicationController

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show

        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: ["words", "expressions","categories.words", "categories.wordstars"]
        else
            render json: {error: "Unauthorized"}, status: :unauthorized
        end
    end


    private
    
    def not_valid(invalid)
        render json: {error: record.invalid.errors.full_messages}, status: :unprocessable_entity
    end

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
