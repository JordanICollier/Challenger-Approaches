class LocationsController < ApplicationController
  def create
    render json: Location.create(location_params)
  end

  private

  def location_params
    params.require(:location).permit(:lat, :long, :user_id, :formatted_address, :group_id).tap { |u|
      u[:user_id] = current_user.id
    }
  end
end
