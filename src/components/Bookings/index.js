import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import BookingItem from '../BookingItem'

import './index.css'

class Bookings extends Component {
  state = {
    bookingList: [],
    titleInput: '',
    toInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      bookingList: prevState.bookingList.map(eachBooking => {
        if (id === eachBooking.id) {
          return {...eachBooking, isStarred: !eachBooking.isStarred}
        }
        return eachBooking
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeToInput = event => {
    this.setState({toInput: event.target.value})
  }

  onAddBooking = event => {
    event.preventDefault()
    const {titleInput, dateInput, toInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      toInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      bookingList: [...prevState.bookingList, newAppointment],
      titleInput: '',
      toInput: '',
      dateInput: '',
    }))
  }

  getFilteredBookingsList = () => {
    const {bookingList, isFilterActive} = this.state

    if (isFilterActive) {
      return bookingList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return bookingList
  }

  render() {
    const {titleInput, toInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredBookingsList = this.getFilteredBookingsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="booking-container">
            <div className="add-booking-container">
              <form className="form" onSubmit={this.onAddBooking}>
                <h1 className="add-booking-heading">Flight Booking</h1>
                <label htmlFor="title" className="label">
                  FROM
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="From"
                />
                <label htmlFor="to" className="label">
                  TO
                </label>
                <input
                  type="text"
                  id="to"
                  value={toInput}
                  onChange={this.onChangeToInput}
                  className="input"
                  placeholder="To"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Book
                </button>
              </form>
              <img
                src="https://img.freepik.com/free-vector/tiny-man-buying-ticket-online-via-laptop-monitor-plane-baggage-flat-vector-illustration-travelling-digital-technology_74855-8621.jpg?w=900&t=st=1690118914~exp=1690119514~hmac=323f5105a460adf2fa0350ce47733f405901324ac913a68e5d5aac923320ba03"
                alt="bookings"
                className="booking-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="booking-heading">Bookings</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="booking-list">
              {filteredBookingsList.map(eachBooking => (
                <BookingItem
                  key={eachBooking.id}
                  appointmentDetails={eachBooking}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookings
