class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include ApplicationHelper

  def index
    @placeholder = 'Your GitHub username'
    gon.push(calendar: [])
  end

  def new
    @placeholder = params.fetch('github_username')
    gon.push(calendar: scrape_calendar(@placeholder))
    render 'index'
  end

  def about

  end
end
