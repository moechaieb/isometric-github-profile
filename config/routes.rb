Rails.application.routes.draw do
  root 'application#index'
  get  'about', to: 'application#about'
  post 'new_calendar', to: 'application#new_calendar'
end
