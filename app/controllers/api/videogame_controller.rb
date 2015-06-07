class Api::VideogameController < ApplicationController
  include ActionView::Helpers::AssetUrlHelper

  def show
      render json: {image: view_context.asset_path("videogames.png")}
  end

end
