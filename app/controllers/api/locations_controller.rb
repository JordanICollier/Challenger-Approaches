class Api::LocationsController < ApiController
  def index
    location = Location.where(user_id: params[:user_id]).presence || [User::NullLocation.new]
    render json: location
  end
end
