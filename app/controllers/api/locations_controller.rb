class Api::LocationsController < ApiController
  def index
    render json: Location.where(user_id: params[:user_id])
  end
end
